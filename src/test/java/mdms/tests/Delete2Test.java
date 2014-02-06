package mdms.tests;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.*;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

import static org.junit.Assert.*;

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

      List<String> ids = new ArrayList<String>();
      // list existing articles
      for (WebElement element : driver.findElements(By.cssSelector("div.article"))) {
          ids.add(element.getAttribute("id"));
      }

      driver.findElement(By.linkText("Add article")).click();
      ((JavascriptExecutor) driver).executeScript("document.editor.setValue('')");
      ((JavascriptExecutor) driver).executeScript("document.editor.setValue('test')");
      driver.findElement(By.id("save")).click();
      driver.findElement(By.cssSelector("button.close")).click();
      driver.findElement(By.id("title")).clear();
      driver.findElement(By.id("title")).sendKeys("titre");
      driver.findElement(By.id("save")).click();

      List<WebElement> articles = (new WebDriverWait(driver, 10))
              .until(ExpectedConditions.presenceOfAllElementsLocatedBy(By.cssSelector("div.article")));

      for (WebElement element : articles) {
          if (!ids.contains(element.getAttribute("id"))){
              assertEquals("test", element.findElement(By.cssSelector("p")).getText());

              assertEquals("titre Delete Edit", element.findElement(By.cssSelector("h2")).getText().replace("\n", " "));
              element.findElement(By.cssSelector("a.btn.btn-xs.btn-info.article-btn.pull-right")).click();
              break;
          }
      }
      assertTrue(isElementPresent(By.id("save")));
      ((JavascriptExecutor) driver).executeScript("document.editor.setValue('')" );
      ((JavascriptExecutor) driver).executeScript("document.editor.setValue('foo')" );
      driver.findElement(By.id("save")).click();

      articles = (new WebDriverWait(driver, 10))
              .until(ExpectedConditions.presenceOfAllElementsLocatedBy(By.cssSelector("div.article")));

      for (WebElement element : articles) {
          if (!ids.contains(element.getAttribute("id"))){
              assertEquals("foo", element.findElement(By.cssSelector("p")).getText());
              element.findElement(By.cssSelector("a.btn-xs.btn-danger.article-btn.pull-right")).click();
              break;
          }
      }
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
