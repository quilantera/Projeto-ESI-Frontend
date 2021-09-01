import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Dropdown, Menu, Modal } from 'antd';
import { FiEdit, FiEye, FiMoreHorizontal } from 'react-icons/fi';

import './styles.scss';

export function StudentActions({ student }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [opinion, setOpinion] = useState('');
  const [evaluation, setEvaluation] = useState('');
  const { name } = student;

  const history = useHistory();

  function showModal() {
    setIsModalVisible(true);
  }

  function hideModal() {
    setIsModalVisible(false);
  }

  function viewReport() {
    const { ra } = student;
    history.push(`/dashboard/students/${ra}`);
  }

  function submitEvaluation(e) {
    e.preventDefault();

    console.log(opinion, evaluation);
    hideModal();
  }

  const menu = (
    <Menu>
      <Menu.Item key="0" onClick={viewReport}>
        <FiEye /> Ver +
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1" onClick={showModal}>
        <FiEdit /> Avaliação
        <Modal
          visible={isModalVisible}
          title={`Avaliação do relatório de ${name}`}
          onCancel={hideModal}
          centered={true}
          footer={null}
          className="evaluation-modal"
        >
          <form onSubmit={submitEvaluation}>
            <label htmlFor="opinion">Parecer</label>
            <textarea
              name="opinion"
              id="opinion"
              rows="6"
              onChange={e => setOpinion(e.target.value)}
              required
            />

            <label htmlFor="evaluation">Avaliação</label>
            <select
              name="evaluation"
              id="evaluation"
              onChange={e => setEvaluation(e.target.value)}
              defaultValue=""
              required
            >
              <option value="" disabled hidden>Escolha uma avaliação</option>
              <option value={0}>Adequado</option>
              <option value={1}>Adequado com ressalvas</option>
              <option value={2}>Insatisfatório</option>
            </select>
            <div className="form-button">
              <button type="reset" onClick={hideModal}>
                Cancelar
              </button>
              <button type="submit">
                Enviar
              </button>
            </div>
          </form>
        </Modal>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']} placement="bottomRight" className="table-dropdown">
      <FiMoreHorizontal onClick={e => e.preventDefault()} style={{ cursor: "pointer" }} />
    </Dropdown>
  );
}