package by.ilya.billingsoftware.io.out;

import by.ilya.billingsoftware.entity.CategoryEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItemResponse {
    private String itemId;
    private String name;
    private BigDecimal price;
    private String description;
    private String imgUrl;
    private String categoryId;
    private String categoryName;
    private Timestamp createdAt;
    private Timestamp updatedAt;
}
