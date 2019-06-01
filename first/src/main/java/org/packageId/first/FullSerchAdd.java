package org.packageId.first;

import java.util.List;

import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.packageId.first.controller.FullSerchAddControler;
import org.packageId.first.modelN.advertismentModel;




@Path("/fullSerchAdd")

public class FullSerchAdd {
	@POST
    @Produces(MediaType.APPLICATION_JSON)
    public List<advertismentModel> getMessage(@FormParam("model")String model,@FormParam("brand")String brand,@FormParam("condition")String condition) {
    	FullSerchAddControler obj = new FullSerchAddControler();
		return obj.fullSerchAddControler(model, brand, condition);
    }
	
	


}
