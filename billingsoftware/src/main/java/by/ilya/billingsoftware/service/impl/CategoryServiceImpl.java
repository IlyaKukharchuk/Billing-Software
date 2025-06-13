package by.ilya.billingsoftware.service.impl;

import by.ilya.billingsoftware.entity.CategoryEntity;
import by.ilya.billingsoftware.exceptions.CategoryNotFoundException;
import by.ilya.billingsoftware.exceptions.FileUploadException;
import by.ilya.billingsoftware.io.in.CategoryRequest;
import by.ilya.billingsoftware.io.out.CategoryResponse;
import by.ilya.billingsoftware.repository.CategoryRepository;
import by.ilya.billingsoftware.repository.ItemRepository;
import by.ilya.billingsoftware.service.CategoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;
    private final FileStorageService fileStorageService;
    private final ItemRepository itemRepository;

    @Transactional
    @Override
    public CategoryResponse add(MultipartFile file, CategoryRequest request) {
        String imgUrl = null;
        try {
            imgUrl = fileStorageService.uploadFile(file);
        } catch (IOException e) {
            throw new FileUploadException("Failed to upload category image", e);
        }
        CategoryEntity newCategory = convertToEntity(request);
        newCategory.setImgUrl(imgUrl);
        newCategory = categoryRepository.save(newCategory);
        return convertToResponse(newCategory);
    }

    @Override
    public List<CategoryResponse> read() {
        List<CategoryEntity> categoryEntities = categoryRepository.findAll();
        return categoryEntities.stream().map(this::convertToResponse).toList();
    }

    @Transactional
    @Override
    public void delete(String categoryId) {
        Optional<CategoryEntity> categoryEntityOptional = categoryRepository.findByCategoryId(categoryId);
        categoryEntityOptional.ifPresentOrElse(
                categoryEntity -> {
                    categoryRepository.delete(categoryEntity);
                    fileStorageService.deleteFile(categoryEntity.getImgUrl());
                },
                () -> {
                    throw new CategoryNotFoundException("Нет растения с id: " + categoryId + " потому нельзя его удалить.");
                }
        );
    }

    private CategoryResponse convertToResponse(CategoryEntity category) {
        Integer itemsCount = countItemsInCategory(category);
        return CategoryResponse.builder()
                .bgColor(category.getBgColor())
                .categoryId(category.getCategoryId()) // UUID как было
                .createdAt(category.getCreatedAt())
                .description(category.getDescription())
                .imgUrl(category.getImgUrl())
                .name(category.getName())
                .updatedAt(category.getUpdatedAt())
                .itemsCount(itemsCount)
                .build();
    }
    private Integer countItemsInCategory(CategoryEntity category){
        if (category == null) {
            throw new IllegalArgumentException("Category entity cannot be null");
        }

        Integer itemsCount = 0;
        try {
            itemsCount = itemRepository.countByCategoryId(category.getId()); // Используем Long id
        } catch (Exception e) {
            log.error("Failed to count items for category {}: {}", category.getId(), e.getMessage());
        }
        return itemsCount;
    }
    private CategoryEntity convertToEntity(CategoryRequest request) {
        return CategoryEntity.builder()
                .bgColor(request.getBgColor())
                .name(request.getName())
                .description(request.getDescription())
                .categoryId(UUID.randomUUID().toString())
                .build();
    }
}
