package org.packageId.first.controller;

import java.util.ArrayList;
import java.util.List;

import org.packageId.first.dataBase.sqlClass;
import org.packageId.first.modelN.advertismentModel;

import java.sql.Connection;
import java.sql.Statement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class BrandModelSerchAddControler {
	
	public List<advertismentModel> brandModelSerchAddControler(String model,String brand, String condition){
		
		if(condition.equals("new")) {
			condition = "used";
		}
		else {
			condition = "new";
		}
		
		List<advertismentModel> list = new ArrayList<>();
	
		String sql ="SELECT a.`id`, a.`brand`, a.`model`, a.`year`, a.`condition`, a.`transmission`, a.`fuelType`, a.`capacity`, a.`milage`, a.`location`,a.`price`,a.`type`,user.tel,user.email,user.address,a.`userID` FROM `advertisement` as a JOIN user ON user.id = a.userID WHERE a.`brand` = '"+brand+"' AND a.`model` = '"+model+"' AND a.`condition` = '"+condition+"'";
		sql+=" UNION";
		sql+=" SELECT a.`id`, a.`brand`, a.`model`, a.`year`, a.`condition`, a.`transmission`, a.`fuelType`, a.`capacity`, a.`milage`, a.`location`,a.`price`,a.`type`,company.tel,company.email,company.address,a.`userID` FROM `advertisement` as a JOIN company ON company.name = a.userID WHERE a.`brand` = '"+brand+"' AND a.`model` = '"+model+"'  AND a.`condition` = '"+condition+"'";
		sql+=" UNION";
		sql+=" SELECT a.`id`, a.`brand`, a.`model`, a.`year`, a.`condition`, a.`transmission`, a.`fuelType`, a.`capacity`, a.`milage`, a.`location`,a.`price`,a.`type`,a.tel,a.email,a.address,a.addType as 'addType' FROM advertisementUnRegistered as a WHERE dateTime >= DATE_ADD(CURDATE(),INTERVAL -7 DAY) AND a.`brand` = '"+brand+"' AND a.`model` = '"+model+"'  AND a.`condition` = '"+condition+"'";
		Connection con=sqlClass.getConnection();
        
           try {
                Statement stmt = con.createStatement();
                ResultSet rs= stmt.executeQuery(sql);
                while(rs.next()){
                	advertismentModel add = new advertismentModel(
                			rs.getInt(1),
                			rs.getString(2),
                			rs.getString(3),
                			rs.getString(4),
                			rs.getString(5),
                			rs.getString(6),
                			rs.getString(7),
                			rs.getString(8),
                			rs.getString(9),
                			rs.getString(10),
                			rs.getString(11),
                			rs.getString(12),
                			rs.getString(13),
                			rs.getString(14),
                			rs.getString(15),
                			rs.getString(16));
                	list.add(add);
                }
                stmt.close();
                con.close();
            }
			
			catch (SQLException ex) {
				System.out.print(ex);  
		    }
            
		
		
		
		return list;
		

	}
}