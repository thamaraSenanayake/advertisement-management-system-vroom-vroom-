package org.packageId.first.dataBase;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;

public class sqlClass {
	
    public static Connection forDatabaseThis(){
      String jdbcDriver= "com.mysql.jdbc.Driver";
      String url = "jdbc:mysql://192.168.8.103/vroom";
      String user ="database1";
      String pass = "1234";
      
      // load driver
      try{
              Class.forName(jdbcDriver);
              System.out.println("load driver");
              
      } 
      catch(ClassNotFoundException  ex){
          System.out.println(ex);
      }
      //connect to database 
      try{
          Connection con = DriverManager.getConnection(url, user, pass);
          System.out.println("connect to database ");
          return con;
      } 
      catch (SQLException ex) {
          System.out.println(ex);

      }
      
      return null;
    }
    
    public static Connection   forDatabaseOther(){
        String jdbcDriver= "com.mysql.jdbc.Driver";
        String url = "jdbc:mysql://192.168.8.105/vroom";
        String user ="newuser";
        String pass = "1234";
        
        // load driver 
        try{
            Class.forName(jdbcDriver);
            System.out.println("load driver");
                
        } 
        catch(ClassNotFoundException  ex){
        	System.out.println("load driver error");
        }
        //connect to database 
        try{
        	DriverManager.setLoginTimeout(3);
            Connection con = DriverManager.getConnection(url, user, pass);
            System.out.println("connect to database ");
            return con;
        } 
        catch (SQLException ex) {
        	 System.out.println("connect to database error");

        }
        
        return null;
      }
    public static Connection getConnection(){
		Connection conTwo;
		Connection conOne = sqlClass.forDatabaseThis();
        if(conOne == null) {
        	conTwo = sqlClass.forDatabaseOther();
        	if(conTwo == null) {
        		System.out.print("null");
        		return null;
        	}
        	else {
        		System.out.print("conTwo");
        		return conTwo;
        	}
        }
        else {
        	System.out.print("conOne");
        	return conOne;
        }
        
    }
    
    public static int recoverData(String Sql,String type){
    	
    	Connection	conOne= null;
    	
    	if(type.equals("insert")){
    		conOne=sqlClass.forDatabaseThis();
    	}
    	else {
    		conOne=sqlClass.forDatabaseOther();
    	}
    	
    	int correctOne = 0;
    	if(conOne != null) {
    		try {
                Statement stmt = conOne.createStatement();
                correctOne=stmt.executeUpdate(Sql);
                
            }
            catch (SQLException ex) {
                System.out.println(ex);
            }
    	}
    	return correctOne;
    }
    
    public static int recoverOtherDataBaseData(String Sql,String type){
    	
    	Connection	conOne= null;
    	
    	if(type.equals("insert")){
    		conOne=sqlClass.forDatabaseOther();
    	}
    	else {
    		conOne=sqlClass.forDatabaseThis();
    	}
    	
    	int correctOne = 0;
    	if(conOne != null) {
    		try {
                Statement stmt = conOne.createStatement();
                correctOne=stmt.executeUpdate(Sql);
                
            }
            catch (SQLException ex) {
                System.out.println(ex);
            }
    	}
    	return correctOne;
    }
    
    
    public static int updateIteamSql(String Sql,String type){
        int correctOne = 0,correctTwo = 0;
        Connection conOne = null;
        Connection conTwo = null;
        if(type.equals("onlyThis")) {
        	conOne=sqlClass.forDatabaseThis();
        	conTwo = sqlClass.forDatabaseOther();
        	
        	if(conOne != null) {
        		try {
                    Statement stmt = conOne.createStatement();
                    correctOne=stmt.executeUpdate(Sql);
                    
                }
                catch (SQLException ex) {
                    System.out.println(ex);
                }
        	}
        	
        	if(conTwo != null) {
        		try {
                    Statement stmt = conTwo.createStatement();
                    correctTwo=stmt.executeUpdate(Sql);
                    
                }
                catch (SQLException ex) {
                    System.out.println(ex);
                }
        	}
            
            
        	if(correctOne == 0 && conTwo != null) {
        		Sql = "INSERT INTO `recoverTable`(`sql`) VALUES (\""+Sql+"\")";
        		try {
                    Statement stmt = conTwo.createStatement();
                    correctOne=stmt.executeUpdate(Sql);
                    
                }
                catch (SQLException ex) {
                    System.out.println(ex);
                }
        	}
        	if(correctTwo == 0 && conOne != null) {
        		Sql = "INSERT INTO `recoverTable`(`sql`) VALUES (\""+Sql+"\")";
        		try {
                    Statement stmt = conOne.createStatement();
                    correctTwo=stmt.executeUpdate(Sql);
                    
                }
                catch (SQLException ex) {
                    System.out.println(ex);
                }
        	}
        	
        	if(correctOne == 1 && correctTwo == 1 ) {
        		return 1;
        	}
        	
        }
        else {
        	conOne=sqlClass.forDatabaseThis();
        	conTwo=sqlClass.forDatabaseOther();
        	if(conOne != null) {
        		try {
                    Statement stmt = conOne.createStatement();
                    correctOne=stmt.executeUpdate(Sql);
                    
                }
                catch (SQLException ex) {
                    System.out.println(ex);
                }
        	}
        	else if(conTwo != null) {
        		try {
        			String RecoveSql = "INSERT INTO `recoverTable`(`sql`) VALUES (\""+Sql+"\")";
                    Statement stmt = conTwo.createStatement();
                    correctOne=stmt.executeUpdate(RecoveSql);                
                }
                catch (SQLException ex) {
                    System.out.println(ex);
                }
        	}
        	
        	if(correctOne== 1) {
        		return 1;
        	}
        	else {
        		return 0;
        	}
        }
        
        return 0;
    }
    
    public static  int  rowCount(String Sql){
        int qty=0;  
        String sql =Sql;
        Connection con=sqlClass.forDatabaseThis();
       // Connection conTwo=sqlClass.forDatabaseOther();
        if(con == null) {
        	con=sqlClass.forDatabaseOther();
        }
        
        Logger.getLogger(Sql);
	    try {
	            Statement stmt = con.createStatement();
	            ResultSet rs =  stmt.executeQuery(sql);
	            while(rs.next()){
	                qty++;
	            }
	            System.out.print("conOne"+qty);
	            
	    }
	    catch (SQLException ex) {
	           Logger.getLogger(sqlClass.class.getName()).log(Level.SEVERE, null,ex);
	    }
	    
	    
//	    if(qty == 0 && conTwo != null) {
//	    	try {
//	            Statement stmt = conTwo.createStatement();
//	            ResultSet rs =  stmt.executeQuery(sql);
//	            while(rs.next()){
//	                qty++;
//	            }
//	            System.out.print("conTwo"+qty);
//		    }
//		    catch (SQLException ex) {
//		           Logger.getLogger(sqlClass.class.getName()).log(Level.SEVERE, null,ex);
//		    }
//	    }
	    
	    System.out.println("rowCout");
	    System.out.println(Sql);
	    System.out.println(qty);
	    return qty;
	}
    

}
