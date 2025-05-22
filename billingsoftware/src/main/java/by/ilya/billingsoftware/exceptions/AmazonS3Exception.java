package by.ilya.billingsoftware.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

public class AmazonS3Exception extends RuntimeException {
    String message;
    public AmazonS3Exception(String message) {
        super(message);
        this.message = message;
    }
    public String getErrorMessage() {
        return message;
    }

    public Object getStatusCode() {
        return HttpStatusCode.valueOf(500);
    }
}
