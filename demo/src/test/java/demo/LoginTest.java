package demo;

import java.util.List;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.Capabilities;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.phantomjs.PhantomJSDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.testng.Assert;
import org.testng.Reporter;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;



public class LoginTest {
	static RemoteWebDriver wd;
	 @BeforeMethod
	 public void setUp() throws Exception {
		 Capabilities caps = new DesiredCapabilities();
			((DesiredCapabilities) caps).setJavascriptEnabled(true);
			((DesiredCapabilities) caps).setCapability("takesScreenshot", true);

			
			wd = new PhantomJSDriver(caps);
			wd.manage().window().setSize(new Dimension(1920, 1080));

			wd.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
	 }
	@Test
	public static void loginTest() throws Exception {
		wd.get("http://ankit.rtcamp.net/wp-login.php");
	
		
		wd.findElement(By.id("user_login")).click();
		System.out.println("User_login");
		wd.findElement(By.id("user_login")).clear();
		wd.findElement(By.id("user_login")).sendKeys("admin");
		wd.findElement(By.id("user_pass")).click();
		System.out.println("User_pass");
		wd.findElement(By.id("user_pass")).clear();
		wd.findElement(By.id("user_pass")).sendKeys("rtcamp.com");
		wd.findElement(By.id("wp-submit")).click();
		System.out.println("wp-submit");
		Reporter.log("logged in successfully");
	
	
	}
	@AfterMethod
   public void tearDown()
   {
       wd.quit();
   }

}
