package by.ilya.billingsoftware.service;

import by.ilya.billingsoftware.io.CategoryRequest;
import by.ilya.billingsoftware.io.CategoryResponse;

import java.util.List;

public interface CategoryService {
    CategoryResponse add(CategoryRequest request);
    List<CategoryResponse> read();
    void delete(String categoryId);
}
