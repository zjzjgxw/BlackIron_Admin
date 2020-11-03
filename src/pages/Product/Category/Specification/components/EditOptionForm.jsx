import React, { useState } from 'react';
import { Tag, Modal, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { isSuccess } from '@/utils/utils';
import styles from './EditOptionForm.less';

const EditOptionForm = (props) => {
  const { modalVisible, onCancel, onDelete, onAdd, specification } = props;

  const [inputVisible, setInputVisible] = useState(false);

  const [inputValue, setInputValue] = useState('');

  const [tags, setTags] = useState(specification.options);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSaveOptions = async (value) => {
    const res = await onAdd({ specificationId: specification.id, content: value });

    if (isSuccess(res)) {
      tags.push({
        specificationId: specification.id,
        content: value,
        id: res.data.id,
      });
      setTags(tags);
      setInputVisible(false);
    }
  };

  const handleClose = async (id) => {
    const res = await onDelete(id);
    if (isSuccess(res)) {
      tags.filter((tag) => tag.id !== id);
      setTags(tags);
    }
  };

  return (
    <Modal
      destroyOnClose
      title="编辑选项"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      {tags.map((item) => {
        return (
          <Tag key={item.id} closable onClose={() => handleClose(item.id)}>
            {item.content}
          </Tag>
        );
      })}

      {inputVisible && (
        <Input
          type="text"
          size="small"
          className={styles.tagInput}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={() => handleSaveOptions(inputValue)}
          onPressEnter={() => handleSaveOptions(inputValue)}
        />
      )}
      {!inputVisible && (
        <Tag
          className="site-tag-plus"
          onClick={() => {
            setInputVisible(true);
          }}
        >
          <PlusOutlined /> 添加选项
        </Tag>
      )}
    </Modal>
  );
};

export default EditOptionForm;
