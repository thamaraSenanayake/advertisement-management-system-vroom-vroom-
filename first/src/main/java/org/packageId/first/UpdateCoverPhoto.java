package org.packageId.first;


import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.apache.commons.lang3.RandomStringUtils;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;
import org.packageId.first.dataBase.sqlClass;

@Path("/updateCoverPhoto")

public class UpdateCoverPhoto {
	@POST
    @Consumes(MediaType.MULTIPART_FORM_DATA)
	@Produces(MediaType.TEXT_PLAIN)
    public String getMessage(@FormDataParam("file")InputStream uplodedInputStream,@FormDataParam("file")FormDataContentDisposition fileDeatil, @FormDataParam("userId")String userId,@FormDataParam("key")String key,@FormDataParam("dataEnterType")String dataEnterType ) {
		int check = Encryption.keyCheck(key, userId);
		System.out.println("updateCoverPhoto");
    	if(check == 1) {
    		int response;
    		String sql;
    		
    		String ext = "jpg";
    		String fileName = String.format("%s.%s", RandomStringUtils.randomAlphanumeric(8), ext);
    		sql = "UPDATE `company` SET `location`= '"+fileName+"' WHERE `name` = '"+userId+"'";
    		response = sqlClass.updateIteamSql(sql, dataEnterType);
    		System.out.println(response);
    		if(response == 1){
    			save(uplodedInputStream,fileDeatil,fileName);
    		}
    		else {
    			return "try again latter";	
    		}
    		return "Done";
    	}
    	else {
    		return "invalid user";
    	}
			
    }
	
	
	private String save(InputStream uplodedInputStream,FormDataContentDisposition fileDeatil,String fileName) {
		System.out.println("here");
		String uploadedFileLocation = "/Users/thamarasenanyake/eclipse-workspace/first/src/main/java/org/packageId/first/uploads/" +fileName;

		try {
			OutputStream out = new FileOutputStream(new File(uploadedFileLocation));
			int read = 0;
			byte[] bytes = new byte[1024];

			out = new FileOutputStream(new File(uploadedFileLocation));
			while ((read = uplodedInputStream.read(bytes)) != -1) {
				out.write(bytes, 0, read);
			}
			out.flush();
			out.close();
		} catch (IOException e) {
			System.out.println(e);
			e.printStackTrace();
		}
		
		return "String";
	}

}
