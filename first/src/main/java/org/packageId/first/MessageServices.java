package org.packageId.first;

import java.util.ArrayList;
import java.util.List;

import org.packageId.first.modelN.MessageModel;

public class MessageServices {
	
	public List<MessageModel> getAllMessage(){
		MessageModel m1 = new MessageModel(1, "message", "NImal");
		MessageModel m2 = new MessageModel(2, "message", "Kamal");
		
		
		List<MessageModel> list = new ArrayList<>();
	
		list.add(m1);
		list.add(m2);
		
		return list;
		

	}

}
