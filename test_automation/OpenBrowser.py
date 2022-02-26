import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains

def open_signin_page():
    driver = webdriver.Chrome()
    driver.get("http://localhost:3000")
    return driver

def type_email(driver, email_field, email):
    email_parts = email.split('@')
    email_field.send_keys(email_parts[0])
    action = ActionChains(driver)
    action.key_down(Keys.ALT).send_keys('q').key_up(Keys.ALT).perform()
    email_field.send_keys(email_parts[1])

def type_password(password_field, password):
    password_field.send_keys(password)

def click_login_button(driver):
    login_button = driver.find_element(By.CLASS_NAME, "sign-form-Button")
    login_button.click()

### TEST CASE 1 ###
### When the user clicks on the login button without typing anything on ###
### the email and password fields, an error message should pop below BOTH ###
### of these fields ###

###def test_case_1():



def main():
    driver = open_signin_page()

    email_field = driver.find_element(By.NAME, "email")
    password_field = driver.find_element(By.NAME, "password")

    user_email = "ardaakcabuyuk@gmail.com"
    user_password = "hellomello2"

    type_email(driver, email_field, user_email)
    type_password(password_field, user_password)

    click_login_button(driver)


    time.sleep(60)
    driver.close()

if __name__ == '__main__':
    main()
