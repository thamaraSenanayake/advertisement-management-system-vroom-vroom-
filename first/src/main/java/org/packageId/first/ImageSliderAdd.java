package org.packageId.first;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.packageId.first.controller.ImageSliderAddControler;
import org.packageId.first.modelN.advertismentModel;




@Path("/imageSliderAdd")

public class ImageSliderAdd {
	@GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<advertismentModel> getMessage() {
    	ImageSliderAddControler obj = new ImageSliderAddControler();
		return obj.getAllAdds();
    }
	
	


}
