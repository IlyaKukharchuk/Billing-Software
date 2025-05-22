package by.ilya.billingsoftware.service;

import by.ilya.billingsoftware.io.CategoryRequest;
import by.ilya.billingsoftware.io.CategoryResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface CategoryService {
    CategoryResponse add(MultipartFile file, CategoryRequest request);
    List<CategoryResponse> read();
    void delete(String categoryId);
}
