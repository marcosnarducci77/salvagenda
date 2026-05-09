export function getHealthStatus() {
  return {
    status: 'ok',
    service: 'salvagenda-api',
    timestamp: new Date().toISOString()
  };
}
