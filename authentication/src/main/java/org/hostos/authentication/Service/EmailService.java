package org.hostos.authentication.Service;

import com.mailjet.client.MailjetClient;
import com.mailjet.client.MailjetRequest;
import com.mailjet.client.MailjetResponse;
import com.mailjet.client.resource.Emailv31;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

        @Value("${mailjet.api-key}")
        private String apiKey;

        @Value("${mailjet.api-secret}")
        private String apiSecret;

        @Autowired
        private AuthService authService;

        public void sendPasswordResetEmail(String to) throws Exception {
                String newPassword = authService.generateNewPassword();
                authService.updatePassword(to, newPassword);

                @SuppressWarnings("deprecation")
                MailjetClient client = new MailjetClient(apiKey, apiSecret);
                MailjetRequest request;
                MailjetResponse response;

                String subject = "Password Reset Request";
                String body = "Your new password is: " + newPassword;

                request = new MailjetRequest(Emailv31.resource)
                                .property(Emailv31.MESSAGES, new JSONArray()
                                                .put(new JSONObject()
                                                                .put(Emailv31.Message.FROM, new JSONObject()
                                                                                .put("Email", "luis.hostos.hostos@gmail.com")
                                                                                .put("Name", "Hostos Company"))
                                                                .put(Emailv31.Message.TO, new JSONArray()
                                                                                .put(new JSONObject()
                                                                                                .put("Email", to)
                                                                                                .put("Name", "Recipient")))
                                                                .put(Emailv31.Message.SUBJECT, subject)
                                                                .put(Emailv31.Message.TEXTPART, body)
                                                                .put(Emailv31.Message.CUSTOMID,
                                                                                "AppGettingStartedTest")));

                response = client.post(request);
                System.out.println(response.getStatus());
                System.out.println(response.getData());
        }
}
