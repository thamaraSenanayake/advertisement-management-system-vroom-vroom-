package org.packageId.first;

import java.util.List;

import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.packageId.first.controller.ModelSerchAddControler;
import org.packageId.first.modelN.advertismentModel;




@Path("/modelSerchAdd")

public class ModelSerchAdd {
	@POST
    @Produces(MediaType.APPLICATION_JSON)
    public List<advertismentModel> getMessage(@FormParam("model")String model,@FormParam("brand")String brand) {
    	ModelSerchAddControler obj = new ModelSerchAddControler();
		return obj.modelSerchAddControler(model, brand);
    }
	
	


}
