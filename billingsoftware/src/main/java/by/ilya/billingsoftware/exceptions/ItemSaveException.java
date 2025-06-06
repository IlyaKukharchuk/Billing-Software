package by.ilya.billingsoftware.exceptions;

public class ItemSaveException  extends RuntimeException {
    public ItemSaveException(String message, Throwable cause) {
        super(message, cause);
    }
}