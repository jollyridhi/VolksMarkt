from django.core import mail
from rest_framework import status
from rest_framework.test import APITestCase

class PasswordResetTest(APITestCase):

    # endpoints needed
    register_url = "/api/v1/users/"
    activate_url = "/api/v1/users/activation/"
    login_url = "/api/v1/token/login/"
    send_reset_password_email_url = "/api/v1/users/reset_password/"
    confirm_reset_password_url = "/api/v1/users/reset_password_confirm/"
    
    # user infofmation
    user_data = {
        "email": "test@example.com", 
        "username": "test_user", 
        "password": "verysecret"
    }
    login_data = {
        "email": "test@example.com", 
        "password": "verysecret"
    }

    def test_reset_password(self):
        # register the new user
        response = self.client.post(self.register_url, self.user_data, format="json")
        # expected response 
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        # expected one email to be send
        self.assertEqual(len(mail.outbox), 1)
        
        # parse email to get uid and token
        email_lines = mail.outbox[0].body.splitlines()
        activation_link = [l for l in email_lines if "/activate/" in l][0]
        uid, token = activation_link.split("/")[-2:]
        
        # verify email
        data = {"uid": uid, "token": token}
        response = self.client.post(self.activate_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        # reset password
        data = {"email": self.user_data["email"]}
        response = self.client.post(self.send_reset_password_email_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        # parse reset-password email to get uid and token
        # it is a second email!
        email_lines = mail.outbox[1].body.splitlines()
        reset_link = [l for l in email_lines if "/reset_password/" in l][0]
        uid, token = activation_link.split("/")[-2:]

        # confirm reset password
        data = {"uid": uid, "token": token, "new_password": "new_verysecret"}
        response = self.client.post(self.confirm_reset_password_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        # login to get the authentication token with old password
        response = self.client.post(self.login_url, self.login_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        
        # login to get the authentication token with new password
        login_data = dict(self.login_data)
        login_data["password"] = "new_verysecret"
        response = self.client.post(self.login_url, login_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        

    def test_reset_password_inactive_user(self):
        # register the new user
        response = self.client.post(self.register_url, self.user_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # reset password for inactive user
        data = {"email": self.user_data["email"]}
        response = self.client.post(self.send_reset_password_email_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        # the email wasnt send
        self.assertEqual(len(mail.outbox), 1)
        

    def test_reset_password_wrong_email(self):
        data = {"email": "wrong@email.com"}
        response = self.client.post(self.send_reset_password_email_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        # the email wasnt send
        self.assertEqual(len(mail.outbox), 0)