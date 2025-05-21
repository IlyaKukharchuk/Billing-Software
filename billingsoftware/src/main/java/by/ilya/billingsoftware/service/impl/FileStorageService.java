package by.ilya.billingsoftware.service.impl;

import by.ilya.billingsoftware.exceptions.AmazonS3Exception;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;
import java.util.UUID;
import java.util.regex.Pattern;

@Service
@Slf4j
public class FileStorageService {
    @Autowired private AmazonS3 amazonS3;
    @Value("${selectel.bucket-name}") private String bucketName;
    @Value("${selectel.endpoint}") private String endpoint;
    @Value("${selectel.domen}") private String domen;

    public String uploadFile(MultipartFile file) throws IOException {
        try {
            // Проверка на пустой файл
            if (file.isEmpty()) {
                throw new IllegalArgumentException("Файл пустой");
            }

            // Генерация ключа с нормальным именем
            String fileName = Optional.ofNullable(file.getOriginalFilename())
                    .orElseThrow(() -> new IOException("У файла нет имени"));
            String key = "uploads/" + UUID.randomUUID() + "-" + fileName;

            // Метаданные
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(file.getContentType());
            metadata.setContentLength(file.getSize());

            // Загрузка
            amazonS3.putObject(bucketName, key, file.getInputStream(), metadata);

            log.info("Файл {} загружен в S3. Размер: {} bytes", key, file.getSize());
            return "https://" + domen + "/" + key;

        } catch (AmazonS3Exception e) {
            log.error("S3 Error: {} (HTTP {})", e.getMessage(), e.getStatusCode());
            throw new IOException("Ошибка S3: " + e.getErrorMessage(), e);
        }
    }

    // Удаление файла
    public void deleteFile(String fileUrl) {
        log.info("fileUrl: {}", fileUrl);
        if(fileUrl == null){
            return;
        }
        String key = fileUrl.replaceFirst("^https?://[^/]+/", "");
        try {
            amazonS3.deleteObject(bucketName, key);
            log.info("Файл {} удалён", key);
        } catch (AmazonS3Exception e) {
            log.error("Ошибка удаления: {}", e.getMessage());
            throw new RuntimeException("Не удалось удалить файл", e);
        }
    }
}