package by.ilya.billingsoftware.controller;

import by.ilya.billingsoftware.io.CategoryRequest;
import by.ilya.billingsoftware.io.CategoryResponse;
import by.ilya.billingsoftware.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/categories")
//@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CategoryResponse addCategory(@RequestPart("category") @Valid CategoryRequest request,
                                        @RequestPart("file") MultipartFile file){
        if (file.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Файл пустой");
        }
        return categoryService.add(file, request);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<CategoryResponse> findAllCategories(){
        return categoryService.read();
    }

    @DeleteMapping("/{categoryId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable String categoryId){
        categoryService.delete(categoryId);
    }
}
