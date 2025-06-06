package by.ilya.billingsoftware.service;

import by.ilya.billingsoftware.io.in.ItemRequest;
import by.ilya.billingsoftware.io.out.ItemResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ItemService {
    ItemResponse add(ItemRequest request, MultipartFile file);
    List<ItemResponse> fetchItems();
    void deleteItem(String itemId);
}
