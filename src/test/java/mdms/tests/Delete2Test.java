package mdms.tests;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.*;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.concurrent.TimeUnit;

import static org.junit.Assert.*;
import static org.junit.Assert.assertEquals;

public class Delete2Test {
  private WebDriver driver;
  private String baseUrl;
  private boolean acceptNextAlert = true;
  private StringBuffer verificationErrors = new StringBuffer();

  @Before
  public void setUp() throws Exception {
    driver = new FirefoxDriver();
    baseUrl = "http://localhost:8080/";
    driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
  }

  @Test
  public void testDelete2() throws Exception {
      driver.get(baseUrl);
    driver.findElement(By.name("login")).clear();
    driver.findElement(By.name("login")).sendKeys("admin");
    driver.findElement(By.name("password")).clear();
    driver.findElement(By.name("password")).sendKeys("admin");
    driver.findElement(By.cssSelector("button.btn.btn-success")).click();
    driver.findElement(By.linkText("Add article")).click();

      ((JavascriptExecutor) driver).executeScript("document.editor.setValue('')" );
      ((JavascriptExecutor) driver).executeScript("document.editor.setValue('test')" );
    driver.findElement(By.id("save")).click();
    driver.findElement(By.cssSelector("button.close")).click();
    driver.findElement(By.id("title")).clear();
    driver.findElement(By.id("title")).sendKeys("titre");
    driver.findElement(By.id("save")).click();
    driver.findElement(By.xpath("(//a[contains(text(),'Delete')])[4]")).click();
    driver.findElement(By.linkText("Sign out")).click();

      driver.findElement(By.name("login")).clear();
      driver.findElement(By.name("login")).sendKeys("admin");
      driver.findElement(By.name("password")).clear();
      driver.findElement(By.name("password")).sendKeys("admin");
      driver.findElement(By.cssSelector("button.btn.btn-success")).click();
      driver.findElement(By.linkText("Add article")).click();
      ((JavascriptExecutor) driver).executeScript("document.editor.setValue('')");
      ((JavascriptExecutor) driver).executeScript("document.editor.setValue('test')");
      driver.findElement(By.id("save")).click();
      driver.findElement(By.cssSelector("button.close")).click();
      driver.findElement(By.id("title")).clear();
      driver.findElement(By.id("title")).sendKeys("titre");
      driver.findElement(By.id("save")).click();
      assertEquals("test", driver.findElement(By.xpath("//div[4]/p")).getText());
      assertEquals("titre Delete Edit", driver.findElement(By.xpath("//div[4]/h2")).getText());
      driver.findElement(By.xpath("(//a[contains(text(),'Edit')])[4]")).click();
      assertTrue(isElementPresent(By.id("save")));
      ((JavascriptExecutor) driver).executeScript("document.editor.setValue('')" );
      ((JavascriptExecutor) driver).executeScript("document.editor.setValue('foo')" );
       driver.findElement(By.id("save")).click();
      assertFalse(isElementPresent(By.id("save")));
      assertEquals("footest", driver.findElement(By.xpath("//div[4]/p")).getText());
      driver.findElement(By.xpath("(//a[contains(text(),'Delete')])[4]")).click();
      driver.findElement(By.linkText("Sign out")).click();
  }

  @After
  public void tearDown() throws Exception {
    driver.quit();
    String verificationErrorString = verificationErrors.toString();
    if (!"".equals(verificationErrorString)) {
      fail(verificationErrorString);
    }
  }

    public void waitForElementVisible(By element){
        WebDriverWait wait = new WebDriverWait(driver, 10);
        WebElement res = wait.until(ExpectedConditions.visibilityOf(driver.findElement(element)));

    }

  private boolean isElementPresent(By by) {
    try {
      driver.findElement(by);
      return true;
    } catch (NoSuchElementException e) {
      return false;
    }
  }

  private boolean isAlertPresent() {
    try {
      driver.switchTo().alert();
      return true;
    } catch (NoAlertPresentException e) {
      return false;
    }
  }

  private String closeAlertAndGetItsText() {
    try {
      Alert alert = driver.switchTo().alert();
      String alertText = alert.getText();
      if (acceptNextAlert) {
        alert.accept();
      } else {
        alert.dismiss();
      }
      return alertText;
    } finally {
      acceptNextAlert = true;
    }
  }
}
