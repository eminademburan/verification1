import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait

def open_signin_page():
    driver = webdriver.Chrome()
    driver.get("http://localhost:3000")
    return driver

def get_email_field(driver):
    email_field = driver.find_element(By.NAME, "email")
    return email_field

def get_password_field(driver):
    password_field = driver.find_element(By.NAME, "password")
    return password_field

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

def prepare_test_case_1(driver):
    empty_email_phone_error_element = driver.find_element(by=By.CLASS_NAME, value="empty-email-phone")
    empty_password_error_element = driver.find_element(by=By.CLASS_NAME, value="empty-password")

    email_field = get_email_field(driver)
    password_field = get_password_field(driver)

    return empty_email_phone_error_element, empty_password_error_element, email_field, password_field

def test_case_1():
    driver = webdriver.Chrome("chromedriver")
    driver.get("http://localhost:3000")

    empty_email_phone_msg = "Email adress should be filled"
    empty_password_msg = "Password should be filled"

    empty_email_phone_error_element, empty_password_error_element, email_field, password_field = prepare_test_case_1(driver)

    # TEST CASE 1.1 #
    # Leave email/phonenumber field blank and check the error message #
    type_password(password_field, 'dummy')
    click_login_button(driver)

    if empty_email_phone_error_element.text == empty_email_phone_msg and empty_password_error_element.text == "":
        print('Test 1.1 successful')
    else:
        print('Test 1.1 failed')

    driver.refresh()
    empty_email_phone_error_element, empty_password_error_element, email_field, password_field = prepare_test_case_1(driver)

    # TEST CASE 1.2 #
    # Leave password field blank and check the error message #
    email_field.send_keys('dummy')
    click_login_button(driver)

    if empty_password_error_element.text == empty_password_msg and empty_email_phone_error_element.text == "":
        print('Test 1.2 successful')
    else:
        print('Test 1.2 failed')

    driver.refresh()
    empty_email_phone_error_element, empty_password_error_element, email_field, password_field = prepare_test_case_1(driver)

    # TEST CASE 1.3 #
    # Leave both fields blank and check the error messages #
    click_login_button(driver)

    if empty_password_error_element.text == empty_password_msg and empty_email_phone_error_element.text == empty_email_phone_msg:
        print('Test 1.3 successful')
    else:
        print('Test 1.3 failed')

def main():
    test_case_1()

if __name__ == '__main__':
    main()
