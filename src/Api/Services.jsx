export const config = {
  apiBaseUrl: "http://localhost:3000",
};

export async function getData(url) {
  try {
    let response = await fetch(url);
    let result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function postData(url, data) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error posting data:", error);
  }
}

export const updateData = async (url, id, updatedTask) => {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });

    if (!response.ok) {
      throw new Error(`Failed to update task. Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error updating task:", error);
  }
};

export const deleteData = async (url, id) => {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete task. Status: ${response.status}`);
    }
    return true;
  } catch (error) {
    console.error("Error deleting task:", error);
    return false;
  }
};
