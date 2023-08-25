import React from 'react';
import { View, Button, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useConnectorsStatus } from '../hooks/hooks';

export const MyComponent = () => {
  const { data, loading, error, fetchConnectorsStatus } = useConnectorsStatus();

  return (
    <View style={styles.container}>
      <Button title="Fetch Status" onPress={() => fetchConnectorsStatus([1, 2, 3])} />
      
      {loading && (
        <ActivityIndicator size="large" color="#0000ff" />
      )}

      {error && (
        <Text style={styles.errorText}>Error: {error.message}</Text>
      )}

      {data && data.map(item => (
        <View key={item.connector_id} style={styles.item}>
          <Text>Connector ID: {item.connector_id}</Text>
          <Text>Status: {item.status}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  item: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  }
});