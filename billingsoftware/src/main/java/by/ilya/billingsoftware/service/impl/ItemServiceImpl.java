package by.ilya.billingsoftware.service.impl;

import by.ilya.billingsoftware.entity.CategoryEntity;
import by.ilya.billingsoftware.entity.ItemEntity;
import by.ilya.billingsoftware.exceptions.CategoryNotFoundException;
import by.ilya.billingsoftware.exceptions.FileUploadException;
import by.ilya.billingsoftware.exceptions.ItemSaveException;
import by.ilya.billingsoftware.io.in.ItemRequest;
import by.ilya.billingsoftware.io.out.ItemResponse;
import by.ilya.billingsoftware.repository.CategoryRepository;
import by.ilya.billingsoftware.repository.ItemRepository;
import by.ilya.billingsoftware.service.ItemService;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService {
    private final FileStorageService fileStorageService;
    private final CategoryRepository categoryRepository;
    private final ItemRepository itemRepository;

    @Transactional
    @Override
    public ItemResponse add(ItemRequest request, @NotNull MultipartFile file) {
        CategoryEntity category = categoryRepository.findByCategoryId(request.getCategoryId())
                .orElseThrow(() -> new CategoryNotFoundException("Category not found, id: " + request.getCategoryId()));
        String imgUrl = uploadImage(file);
        ItemEntity newItem = convertToEntity(request, category, imgUrl);
        try{
            newItem = itemRepository.save(newItem);
            return convertToResponse(newItem);
        }catch (Exception e){
            deleteImage(imgUrl);
            throw new ItemSaveException("Unable to save item: " + newItem, e);
        }
    }

    @Override
    public List<ItemResponse> fetchItems() {
        return itemRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    @Transactional
    @Override
    public void deleteItem(String itemId) {
        ItemEntity itemEntity = itemRepository.findByItemId(itemId)
                .orElseThrow(() -> new RuntimeException("Item with id: " + itemId + "not found."));
        deleteImage(itemEntity.getImgUrl());
        itemRepository.delete(itemEntity);
    }

    private ItemEntity convertToEntity(ItemRequest request, CategoryEntity category, String imgUrl) {
        return ItemEntity.builder()
                .itemId(UUID.randomUUID().toString())
                .name(request.getName())
                .price(request.getPrice())
                .description(request.getDescription())
                .imgUrl(imgUrl)
                .category(category)
                .build();
    }

    private ItemResponse convertToResponse(ItemEntity item) {
        return ItemResponse.builder()
                .itemId(item.getItemId())
                .name(item.getName())
                .price(item.getPrice())
                .description(item.getDescription())
                .imgUrl(item.getImgUrl())
                .categoryId(item.getCategory().getCategoryId())
                .categoryName(item.getCategory().getName())
                .createdAt(item.getCreatedAt())
                .updatedAt(item.getUpdatedAt())
                .build();
    }
    private String uploadImage(MultipartFile file){
        String imgUrl;
        try {
            imgUrl = fileStorageService.uploadFile(file);
        } catch (IOException e) {
            throw new FileUploadException("Failed to upload image: " + file.getOriginalFilename(), e);
        }
        return imgUrl;
    }
    private void deleteImage(String imgUrl) {
        fileStorageService.deleteFile(imgUrl);
    }
}
