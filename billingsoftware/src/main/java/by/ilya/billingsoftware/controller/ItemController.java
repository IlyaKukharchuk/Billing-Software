package by.ilya.billingsoftware.controller;

import by.ilya.billingsoftware.io.in.ItemRequest;
import by.ilya.billingsoftware.io.out.ItemResponse;
import by.ilya.billingsoftware.service.ItemService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ItemController {
    private final ItemService itemService;

    @PostMapping("admin/items")
    @ResponseStatus(HttpStatus.CREATED)
    public ItemResponse addItem(@RequestPart("item") @Valid ItemRequest request,
                                @RequestPart("file") MultipartFile file){
        if (file.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "file is empty");
        }
        return itemService.add(request, file);
    }

    @GetMapping("/items")
    public List<ItemResponse> readItems(){
        return itemService.fetchItems();
    }

    @DeleteMapping("/admin/items/{itemId}")
    public void deleteItem(@PathVariable String itemId){
        try {
           itemService.deleteItem(itemId);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found");
        }
    }
}
