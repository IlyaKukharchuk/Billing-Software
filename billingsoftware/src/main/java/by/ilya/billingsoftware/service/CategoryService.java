package by.ilya.billingsoftware.service;

import by.ilya.billingsoftware.io.in.CategoryRequest;
import by.ilya.billingsoftware.io.out.CategoryResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CategoryService {
    CategoryResponse add(MultipartFile file, CategoryRequest request);
    List<CategoryResponse> read();
    void delete(String categoryId);
}
