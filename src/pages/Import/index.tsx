import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { uniqueId } from 'lodash';

import filesize from 'filesize';

import Header from '../../components/Header';
import FileList from '../../components/FileList';
import Upload from '../../components/Upload';

import { Container, Title, ImportFileContainer, Footer } from './styles';

import alert from '../../assets/alert.svg';
import api from '../../services/api';

interface FileProps {
  id: string;
  file: File;
  name: string;
  readableSize: string;
  preview: string;
  progress: number;
  uploaded: boolean;
  error: boolean;
  url: string;
}

const Import: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);
  const history = useHistory();  // eslint-disable-next-line

  async function handleUpload(): Promise<void> {
    const data = new FormData();

    // TODO

    data.append('file', {uploadedFiles.file});
    try {
      await api.post('/transactions/import', data);
    } catch (err) {
      // console.log(err.response.error);
    }
  }

  function submitFile(files: File[]): void {
    const uploadFiles = files.map((file) => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: '',
    }));

    setUploadedFiles(uploadedFiles.concat(uploadFiles));
    // uploadFiles.forEach(updateFile);
  }

  // updateFile = (id, data) => {
  //   setUploadedFiles([
  //     uploadedFiles: setUploadedFiles.map((uploadedFile) => {
  //       return id === uploadedFile.id
  //         ? { ...uploadedFile, ...data }
  //         : uploadedFile;
  //     ]),
  //   });
  // };

  return (
    <>
      <Header size="small" />
      <Container>
        <Title>Importar uma transação</Title>
        <ImportFileContainer>
          <Upload onUpload={submitFile} />
          {!!uploadedFiles.length && <FileList files={uploadedFiles} />}

          <Footer>
            <p>
              <img src={alert} alt="Alert" />
              Permitido apenas arquivos CSV
            </p>
            <button onClick={handleUpload} type="button">
              Enviar
            </button>
          </Footer>
        </ImportFileContainer>
      </Container>
    </>
  );
};

export default Import;
