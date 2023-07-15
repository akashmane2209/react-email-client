import { EmailItem, EmailList } from "@/types";
import ApiService from "./api.service";
import { EMAIL_URLS } from "./url.service";

const EmailService = {
  fetchEmails(page = 1) {
    return ApiService.get<EmailList>(EMAIL_URLS.EMAIL(), { params: { page } });
  },
  fetchEmailById(id: string) {
    return ApiService.get<EmailItem>(EMAIL_URLS.EMAIL(), {
      params: { id },
    });
  },
};

export default EmailService;
