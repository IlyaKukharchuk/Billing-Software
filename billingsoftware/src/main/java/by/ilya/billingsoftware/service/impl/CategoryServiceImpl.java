package by.ilya.billingsoftware.service.impl;

import by.ilya.billingsoftware.exceptions.CategoryNotFoundException;
import by.ilya.billingsoftware.service.CategoryService;
import by.ilya.billingsoftware.entity.CategoryEntity;
import by.ilya.billingsoftware.io.in.CategoryRequest;
import by.ilya.billingsoftware.io.out.CategoryResponse;
import by.ilya.billingsoftware.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;
    private final FileStorageService fileStorageService;
    @Override
    public CategoryResponse add(MultipartFile file, CategoryRequest request) {
        String imgUrl = null;
        try {
            imgUrl = fileStorageService.uploadFile(file);
        } catch (IOException e) {
            throw new RuntimeException(e);
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

    @Override
    public void delete(String categoryId) {
        Optional<CategoryEntity> categoryEntityOptional = categoryRepository.findByCategoryId(categoryId);
        categoryEntityOptional.ifPresentOrElse(
                categoryEntity -> {
                    fileStorageService.deleteFile(categoryEntity.getImgUrl());
                    categoryRepository.delete(categoryEntity);
                },
                () -> {
                    throw new CategoryNotFoundException("Нет растения с id: " + categoryId + " потому нельзя его удалить.");
                }
        );
    }

    private CategoryResponse convertToResponse(CategoryEntity newCategory) {
        return CategoryResponse.builder()
                .bgColor(newCategory.getBgColor())
                .categoryId(newCategory.getCategoryId())
                .createdAt(newCategory.getCreatedAt())
                .description(newCategory.getDescription())
                .imgUrl(newCategory.getImgUrl())
                .name(newCategory.getName())
                .updatedAt(newCategory.getUpdatedAt())
                .build();
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
