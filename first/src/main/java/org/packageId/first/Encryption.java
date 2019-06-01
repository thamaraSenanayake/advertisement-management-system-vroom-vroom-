package org.packageId.first;

import org.packageId.first.dataBase.sqlClass;

public class Encryption {
	
	
    public static String encryption(String key) {
        String[] numbers = key.split("");                                                                                   
        
        for ( int x=0; x<numbers.length; x++) {
            System.out.println(numbers[x]);
        	int result = Integer.parseInt(numbers[x]);
        	result+=2;
        	numbers[x] = Integer.toString(result);
            System.out.println(numbers[x]);

        }
		return numbers[0]+""+numbers[1]+""+numbers[2]+""+numbers[3];
        
    }
    
    public static int keyCheck(String key,String id) {
        String[] numbers = key.split("");                                                                                   
        int count;
        for ( int x=0; x<numbers.length; x++) {
        	int result = Integer.parseInt(numbers[x]);
        	result-=2;
        	numbers[x] = Integer.toString(result);

        }
		String decriptKey = numbers[0]+""+numbers[1]+""+numbers[2]+""+numbers[3];
        
		String sql = "SELECT * FROM `user` WHERE `id`= '"+id+"' AND `keyValue` = '"+decriptKey+"'";
		count = sqlClass.rowCount(sql);
		if(count == 0) {
			sql = "SELECT * FROM `company` WHERE `name`= '"+id+"' AND `keyValue` = '"+decriptKey+"'";
			count = sqlClass.rowCount(sql);

		}
		
		return count;
    }

}
