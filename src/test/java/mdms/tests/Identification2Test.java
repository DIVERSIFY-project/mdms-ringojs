package mdms.tests;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

import java.util.concurrent.TimeUnit;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.fail;

public class Identification2Test {
  private WebDriver driver;
  private String baseUrl;
  private boolean acceptNextAlert = true;
  private StringBuffer verificationErrors = new StringBuffer();

  @Before
  public void setUp() throws Exception {
    driver = new FirefoxDriver();
    baseUrl = "http://localhost:8080/";
    driver.manage().timeouts().implicitlyWait(6, TimeUnit.SECONDS);
  }

  @Test
  public void testIdentification2() throws Exception {
        driver.get(baseUrl);
      driver.findElement(By.name("login")).clear();
      driver.findElement(By.name("login")).sendKeys("admin");
      driver.findElement(By.name("password")).clear();
      driver.findElement(By.name("password")).sendKeys("admin");
      driver.findElement(By.cssSelector("button.btn.btn-success")).click();
      driver.findElement(By.cssSelector("button.close")).click();
      assertFalse(isElementPresent(By.cssSelector("button.btn.btn-success")));
      driver.findElement(By.linkText("Sign out")).click();
      driver.findElement(By.cssSelector("button.close")).click();
      assertFalse(isElementPresent(By.linkText("Sign out")));
  }

  @After
  public void tearDown() throws Exception {
    driver.quit();
    String verificationErrorString = verificationErrors.toString();
    if (!"".equals(verificationErrorString)) {
      fail(verificationErrorString);
    }
  }

  private boolean isElementPresent(By by) {
    try {
      driver.findElement(by);
      return true;
    } catch (NoSuchElementException e) {
      return false;
    }
  }
}
