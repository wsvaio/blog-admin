export default (action: () => Promise<any>) => {
  const loading = ref(false);
  const load = async () => {
    loading.value = true;
    return action().finally(() => (loading.value = false));
  };

  return { load, loading };
};
