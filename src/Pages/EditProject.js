
  const index = projectList.findIndex((listItem) => listItem === item);

  
  const Edit = () => {
    var textTitle = document.getElementById('editTitle').value;

    const newList = replaceItemAtIndex(projectList, index, {
      ...item,
      title: textTitle,
    });

    closeModal();
  }