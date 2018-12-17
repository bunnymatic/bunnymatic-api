defmodule BunnymaticApi.Factory do
  # with Ecto
  use ExMachina.Ecto, repo: BunnymaticApi.Repo

  def image_factory do
    %BunnymaticApi.Image {
      dimensions: "5 x 5",
      file: sequence(:file, &"untitled_#{&1}"),
      medium: "Paper",
      title: sequence(:name, &"Untitled ##{&1}"),
      year: 2000 + :rand.uniform(20)
    }
  end

end
