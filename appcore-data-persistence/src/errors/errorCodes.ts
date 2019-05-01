export class ErrorCodes {
    private static errorPrefix = "E";
    
    private static technicalError = "0";
    private static logicError = "1";

    private static task = "00";
    private static timelog = "01";

    private static notFound = "00";

    static get taskNotFound() {
        return this.errorPrefix + this.logicError +
            this.task + this.notFound;
    }
}