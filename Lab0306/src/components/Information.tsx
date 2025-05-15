function Information({
  home,
  study,
  like,
}: {
  home: string;
  study: string;
  like: string;
}) {
  return (
    <div>
      <p>I'm from {home}</p>
      <p>I study {study}</p>
      <p>I like {like}</p>
    </div>
  );
}

export default Information;
