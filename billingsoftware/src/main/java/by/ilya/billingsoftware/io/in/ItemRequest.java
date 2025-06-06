package by.ilya.billingsoftware.io.in;

import by.ilya.billingsoftware.entity.CategoryEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.math.BigDecimal;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItemRequest {
    @NotBlank
    private String name;
    @Positive
    private BigDecimal price;
    @Size(max = 1000)
    private String description;
    private String categoryId;
}
