package by.ilya.billingsoftware.controller.service.impl;

import by.ilya.billingsoftware.controller.service.CategoryService;
import by.ilya.billingsoftware.entity.CategoryEntity;
import by.ilya.billingsoftware.io.CategoryRequest;
import by.ilya.billingsoftware.io.CategoryResponse;
import by.ilya.billingsoftware.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;
    @Override
    public CategoryResponse add(CategoryRequest request) {
        CategoryEntity newCategory = convertToEntity(request);
        newCategory = categoryRepository.save(newCategory);
        return convertToResponse(newCategory);
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
