import React, { useState } from "react";

import {
  FiMoreVertical,
  FiEye,
  FiEdit2,
  FiShare2,
  FiTrash2,
} from "react-icons/fi";

import { FaStar, FaRegStar } from "react-icons/fa";

import styles from "../../styles/saved/SavedTable.module.css";


const SavedTable = ({
  items,
  setItems,
  selectedItem,
  setSelectedItem
}) => {

  const [openMenu, setOpenMenu] = useState(null);

  const removeTag = (id, tagToRemove) => {
  const updatedItems = items.map((item) =>
    item.id === id
      ? {
          ...item,
          tags: item.tags.filter((tag) => tag !== tagToRemove),
        }
      : item
  );

  setItems(updatedItems);
};
const handleAddTag = (item) => {
  const newTag = prompt("Enter tag name");

  if (!newTag || !newTag.trim()) return;

  const updatedItems = items.map((data) =>
    data.id === item.id
      ? {
          ...data,
          tags: [...(data.tags || []), newTag.trim()],
        }
      : data
  );

  setItems(updatedItems);
};
const handleShare = async (item) => {
  const shareData = {
    title: item.title,
    text: item.preview || item.title,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(item.title);
      alert("Content copied!");
    }
  } catch (error) {
    console.log(error);
  }
};


const handleDelete = (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this item?"
  );

  if (!confirmDelete) return;


  const updatedItems = items.filter(
    (item) => item.id !== id
  );


  setItems(updatedItems);


  if(selectedItem?.id === id){
    setSelectedItem(null);
  }

};

  return (

    <div className={styles.tableWrapper}>

      <table className={styles.table}>

        <thead>

          <tr>
            <th>Content</th>
            <th>Tag</th>
            <th>Type</th>
            <th>Saved On</th>
            <th>Actions</th>
          </tr>

        </thead>


        <tbody>

          {items.map((item)=>(

            <tr
              key={item.id}

              onClick={()=>{

                setSelectedItem(item);
                setOpenMenu(null);

              }}

              className={
                selectedItem?.id === item.id
                ? styles.activeRow
                : ""
              }

            >


              {/* Content */}

              <td>

                <div className={styles.contentCell}>


                  <div className={styles.image}>

                    {item.image && (
                      <img
                        src={item.image}
                        alt=""
                      />
                    )}

                  </div>



                  <div className={styles.textArea}>

                    <div className={styles.title}>
                      {item.title}
                    </div>


                    <div className={styles.time}>
                      {item.time}
                    </div>

                  </div>


                </div>

              </td>





              {/* Tags */}

              <td>
  <div className={styles.tags}>
    {item.tags.map((tag, index) => (
      <span key={index} className={styles.tag}>
        {tag}

        <button
          className={styles.removeTag}
          onClick={() => removeTag(item.id, tag)}
        >
          ×
        </button>
      </span>
    ))}
  </div>
</td>




              {/* Type */}

              <td>

                <span
                  className={
                    item.type === "Sign → Text"
                    ? styles.signBadge
                    : styles.textBadge
                  }
                >

                  {item.type}

                </span>

              </td>
              

              {/* Date */}

              <td>

                <div className={styles.date}>

                  <span>
                    {item.date}
                  </span>

                  <span>
                    {item.time}
                  </span>

                </div>

              </td>







              {/* Actions */}

              <td>


                <div className={styles.actions}>


                  {
                    item.favorite

                    ?

                    <FaStar className={styles.star}/>

                    :

                    <FaRegStar className={styles.starEmpty}/>

                  }






                  <button

                    type="button"

                    className={styles.moreBtn}

                    onClick={(e)=>{

                      e.stopPropagation();

                      setOpenMenu(
                        openMenu === item.id
                        ? null
                        : item.id
                      );

                    }}

                  >

                    <FiMoreVertical />

                  </button>







                  {
                    openMenu === item.id && (


                      <div className={styles.dropdownMenu}>


                        {/* View */}

                        <button

                          onClick={(e)=>{

                            e.stopPropagation();

                            setSelectedItem(item);

                            setOpenMenu(null);

                          }}

                        >

                          <FiEye />

                          <span>
                            View
                          </span>

                        </button>







                        {/* Add Tag */}

                        <button

                          onClick={(e)=>{

                            e.stopPropagation();

                            handleAddTag(item);

                            setOpenMenu(null);

                          }}

                        >

                          <FiEdit2 />

                          <span>
                            Add Tag
                          </span>

                        </button>







                        {/* Share */}

                        <button

                          onClick={(e)=>{

                            e.stopPropagation();

                            handleShare(item);

                            setOpenMenu(null);

                          }}

                        >

                          <FiShare2 />

                          <span>
                            Share
                          </span>

                        </button>







                        {/* Delete */}

                        <button

                          onClick={(e)=>{

                            e.stopPropagation();

                            handleDelete(item.id);

                            setOpenMenu(null);

                          }}

                        >

                          <FiTrash2 />

                          <span>
                            Delete
                          </span>

                        </button>



                      </div>


                    )
                  }



                </div>


              </td>



            </tr>


          ))}


        </tbody>


      </table>


    </div>

  );

};


export default SavedTable;