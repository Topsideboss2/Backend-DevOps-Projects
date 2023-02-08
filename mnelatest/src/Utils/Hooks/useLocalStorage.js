

export const LocalStorage = (key, value,  type="get") => {
    if(type === 'get') {
        const item = localStorage.getItem(key);
        if(key === "token") return item;
        return JSON.parse(item);
    }
    
    else {
        JSON.stringify(localStorage.setItem(key, value));
    }
    
  }


export const RemoveLocalStorage = (key) => {
  
        localStorage.removeItem(key); 
  }

  

