import * as React from 'react';
import { Appbar } from 'react-native-paper';

const Appheader = () => {


  const _handleSearch = () => console.log('Searching');

  const _handleMore = () => console.log('Shown more');

  return (
    <Appbar.Header className='bg-white'>
      <Appbar.Content title="Title" color='black' />
      <Appbar.Action icon="magnify" onPress={_handleSearch} />
      
    </Appbar.Header>
  );
};

export default Appheader;