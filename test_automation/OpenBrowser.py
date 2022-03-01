import time
import re
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
    print("\n### TEST CASE 1 ###")
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
        print('Test case 1.1 successful')
    else:
        print('Test case 1.1 failed')

    driver.refresh()
    empty_email_phone_error_element, empty_password_error_element, email_field, password_field = prepare_test_case_1(driver)

    # TEST CASE 1.2 #
    # Leave password field blank and check the error message #
    email_field.send_keys('dummy')
    click_login_button(driver)

    if empty_password_error_element.text == empty_password_msg and empty_email_phone_error_element.text == "":
        print('Test case 1.2 successful')
    else:
        print('Test case 1.2 failed')

    driver.refresh()
    empty_email_phone_error_element, empty_password_error_element, email_field, password_field = prepare_test_case_1(driver)

    # TEST CASE 1.3 #
    # Leave both fields blank and check the error messages #
    click_login_button(driver)

    if empty_password_error_element.text == empty_password_msg and empty_email_phone_error_element.text == empty_email_phone_msg:
        print('Test case 1.3 successful')
    else:
        print('Test case 1.3 failed')

def check_valid_email(email):
    reg = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    if(re.fullmatch(reg, email)):
        return True
    else:
        return False

def check_valid_phone(phone_number):
    phone_pattern = re.compile("(0|90)?[7-9][0-9]{9}")
    if(phone_pattern.match(phone_number)):
        return True
    else:
        return False

def test_case_2():
    print("\n### TEST CASE 2 ###")
    driver = webdriver.Chrome("chromedriver")
    driver.get("http://localhost:3000")
    email_or_phone = get_email_field(driver)
    #Invalid Email entered
    email = 'elifozer@elif'
    type_email(driver, email_or_phone, email)
    valid_email = check_valid_email(email)
    click_login_button(driver)

    if valid_email == False:
        print("Test case 2.1 Succesful")

    #Invalid Phone Number Entered

    email_or_phone.clear()
    phone_number = '123456'
    email_or_phone.send_keys(phone_number)
    valid_phone = check_valid_phone(phone_number)
    click_login_button(driver)
    if valid_phone == False:
        print("Test case 2.2 Succesful")

    driver.close()

def test_case_3():
    print("\n### TEST CASE 3 ###")
    # TEST CASE 3.1 Safari #
    safaridriver = webdriver.Safari()
    safaridriver.get("http://localhost:3000")

    email_field_safari = get_email_field(safaridriver)
    password_field_safari = get_password_field(safaridriver)

    email_field_safari.send_keys('+495514022041')
    type_password(password_field_safari, "hellomello0")

    click_login_button(safaridriver)

    success_msg_safari = safaridriver.find_element(By.XPATH, '//h2').text

    if (success_msg_safari == "Welcome +495514022041"):
        print("Test case 3.1 Succesful")
    else:
        print("Test case 3.1 Failed")

    # TEST CASE 3.2 Chrome #
    chromedriver = webdriver.Chrome()
    chromedriver.get("http://localhost:3000")

    email_field_chrome = get_email_field(chromedriver)
    password_field_chrome = get_password_field(chromedriver)

    type_email(chromedriver, email_field_chrome, "elifozer@gmail.com")
    type_password(password_field_chrome, "hellomello3")

    click_login_button(chromedriver)

    success_msg_chrome = chromedriver.find_element(By.XPATH, '//h2').text

    if (success_msg_chrome == "Welcome elifozer@gmail.com"):
        print("Test case 3.2 Succesful")
    else:
        print("Test case 3.2 Failed")

    safaridriver.close()
    chromedriver.close()


def test_case_4():
    print("\n### TEST CASE 4 ###")
    email = 'elifozer@gmail.com'
    password = 'hellomello3'
    driver = webdriver.Chrome("chromedriver")
    driver.get("http://localhost:3000")

    password_field = get_password_field(driver)
    email_field = get_email_field(driver)

    type_email(driver, email_field, email)
    type_password(password_field, password)

    remember_me_button = driver.find_element(By.NAME, "checkbox")
    remember_me_button.click()
    click_login_button(driver)
    time.sleep(2)

    driver.execute_script("window.open('http://localhost:3000')")
    login_msg = driver.find_element(By.XPATH, '//h2').text

    if (login_msg == ("Welcome " + email)):
        print("Test case 4 successful")
    else:
        print("Test case 4 failed")

    driver.close()

def test_case_5():
    print("\n### TEST CASE 5 ###")
    driver = open_signin_page()
    main_page = driver.current_window_handle

    facebook_login_button = driver.find_element(By.CLASS_NAME, "btnFacebook.metro")
    facebook_login_button.click()

    for handle in driver.window_handles:
        if handle != main_page:
            login_page = handle

    driver.switch_to.window(login_page)

    email_field = driver.find_element(By.NAME, "email")
    type_email(driver, email_field, "ardaakcabuyuk@gmail.com")

    password_field = driver.find_element(By.NAME, "pass")
    type_password(password_field, "ardacs1789")

    login_button = driver.find_element(By.NAME, "login")
    login_button.click()
    driver.find_element(By.ID, "back").click()

    driver.switch_to.window(main_page)
    time.sleep(2)

    if driver.current_url == "http://localhost:3000/welcome":
        print("Test case 5 successful")
    else:
        print("Test case 5 failed")

    driver.close()

def main():
    test_case_1()
    test_case_2()
    test_case_3()
    test_case_4()
    test_case_5()

if __name__ == '__main__':
    main()
