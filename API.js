import { get, post, del } from 'aws-amplify/api';



class Api {
  constructor() {
  }
  
  //Upload obrázku
  async imgUpload(soubor) {
    try {
      const restOperation = post({
        apiName: apiNameAws,
        path: '/image',
        body: JSON.stringify({
            //filename
            //bash64
            //groupId
        })
      });

      const { body } = await restOperation.response;
      const response = await body.json();
  
      console.log('imgUpload succeeded');
      console.log(response);
    } catch (e) {
      console.log('imgUpload failed: ', e);
    }
  };

  //Sync obrázků
  async imgSync(groundId, imgIds, tagIds) {
    try {
      const restOperation = post({
        apiName: apiNameAws,
        path: '/image/sync',
        body: JSON.stringify({
            //groupId
            //fileIds
            //tags
        })
      });

      const { body } = await restOperation.response;
      const response = await body.json();
  
      console.log('imgSync succeeded');
      console.log(response);
    } catch (e) {
      console.log('imgSync failed: ', e);
    }
  }

  //Delete obrázku
  async imgDelete(imgId) {
    try {
      const restOperation = del({
        apiName: apiNameAws,
        path: `/image/${id}`
      });
  
      const { body } = await restOperation.response;
      const response = await body.json();
  
      console.log('imgDelete succeeded');
      console.log(response);
    } catch (e) {
      console.log('imgDelete failed: ', e);
    }
  }

  //Get obrázkek
  async imgGet(imgId) {
    try {
      const restOperation = get({
        apiName: apiNameAws,
        path: `/image/${imgId}`
      });
  
      const { body } = await restOperation.response;
      const response = await body.json();
  
      console.log('imgGet succeeded');
      console.log(response);
    } catch (e) {
      console.log('imgGet failed: ', e);
    }
  }

  // Generace obrázku
  async imgGenerate(prompt) {
    try {
      const restOperation = post({
        apiName: apiNameAws,
        path: '/image/generate',
        body: JSON.stringify({
            //prompt
        })
      });

      const { body } = await restOperation.response;
      const response = await body.json();
  
      console.log('imgGenerate succeeded');
      console.log(response);
    } catch (e) {
      console.log('imgGenerate failed: ', e);
    }
  }

  // Group setup
  async groupCreate(groupName, ownerId) {
    try {
      const restOperation = post({
        apiName: apiNameAws,
        path: '/group',
        body: JSON.stringify({
            //ownerId
            //groupName
        })
      });

      const { body } = await restOperation.response;
      const response = await body.json();
  
      console.log('groupCreate was successful');
      console.log(response);
    } catch (e) {
      console.log('groupCreate failed: ', e);
    }
  }
  
  // Pridani člena do groupy
  async addMember(userEmail, groupId) {
    try {
      const restOperation = post({
        apiName: apiNameAws,
        path: `/group/${groupId}/member`,
        body: JSON.stringify({
            //userEmail
            //groupId
        })
      });

      const { body } = await restOperation.response;
      const response = await body.json();
  
      console.log('addMember was successful');
      console.log(response);
    } catch (e) {
      console.log('addMember failed: ', e);
    }
  }

  //Přidání tagu
  async addTag(tagName) {
    try {
      const restOperation = post({
        apiName: apiNameAws,
        path: "/tag",
        body: JSON.stringify({
            //tagName
        })
      });

      const { body } = await restOperation.response;
      const response = await body.json();
  
      console.log('addTag was successful');
      console.log(response);
    } catch (e) {
      console.log('addTag failed: ', e);
    }
  }

  //Get schedules
  async getSchedules(groupId) {
    try {
      const restOperation = get({
        apiName: apiNameAws,
        path: `/schedules/${groupId}`
      });
  
      const { body } = await restOperation.response;
      const response = await body.json();
  
      console.log('getSchedules was successful');
      console.log(response);
    } catch (e) {
      console.log('getSchedules failed: ', e);
    }
  }

  //Get schedules 2
  async getSchedules2(schedulesId) {
    try {
      const restOperation = get({
        apiName: apiNameAws,
        path: `/schedules/${schedulesId}`
      });
  
      const { body } = await restOperation.response;
      const response = await body.json();
  
      console.log('getSchedules2 was successful');
      console.log(response);
    } catch (e) {
      console.log('getSchedules2 failed: ', e);
    }
  }

  //Přidání schedule
  async addSchedule(groupId, activity) {
    try {
      const restOperation = post({
        apiName: apiNameAws,
        path: "/schedule",
        body: JSON.stringify({
            //groupId
            //activity
        })
      });

      const { body } = await restOperation.response;
      const response = await body.json();
  
      console.log('addSchedule was successful');
      console.log(response);
    } catch (e) {
      console.log('addSchedule failed: ', e);
    }
  }

};

const apiClient = new Api();
const apiNameAws = "idk";

apiClient.imgGenerate("I hate black people");