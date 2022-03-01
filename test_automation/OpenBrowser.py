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

def test_case_1():

    user_email = "email"
    user_password = "password"

    driver = webdriver.Chrome("chromedriver")
    driver.get("http://localhost:3000")
    #email_field = driver.find_element(By.NAME, "email").send_keys(user_email)
    #password_field = driver.find_element(By.NAME, "password").send_keys(user_password)

    #click login
    login_button = driver.find_element(By.CLASS_NAME, "sign-form-Button")
    login_button.click()

    # wait the ready state to be complete
#     WebDriverWait(driver=driver, timeout=10).until(
#         lambda x: x.execute_script("return document.readyState === 'complete'")
#     )
    error_message = "Email adress should be filled"
    error_msg2 = "Password should be filled"

    errors = driver.find_elements(by=By.CLASS_NAME, value="remember-me")

    for e in errors:
        if e.text == error_message or e.text == error_msg2:
            print('test 1 successful')
            break
        else:
            print('test 1 failed')
            break

    time.sleep(60)
    driver.close()

def main():
    driver = open_signin_page()

    email_field = driver.find_element(By.NAME, "")
    password_field = driver.find_element(By.NAME, "")

    user_email = "elifozer@gmail.com"
    user_password = "hellomello3"

    type_email(driver, email_field, user_email)
    type_password(password_field, user_password)

    click_login_button(driver)

    time.sleep(60)
    driver.close()

if __name__ == '__main__':
    #main()
    test_case_1()