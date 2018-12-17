defmodule BunnymaticApi.Image do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {
    Poison.Encoder, only: [
      :dimensions, :file, :medium, :title, :year, :price, :id, :inserted_at, :created_at
    ]
  }
  schema "images" do
    field :dimensions, :string
    field :file, :string
    field :medium, :string
    field :title, :string
    field :year, :integer
    field :price, :string

    timestamps()
  end

  @doc "create changeset"
  def create_changeset(image, attrs) do
    image
    |> cast(attrs, [:title, :price, :file, :medium, :dimensions, :year])
    |> validate_required([:title, :file])
  end

  def update_changeset(image, attrs) do
    image
    |> cast(attrs, [:title, :price, :file, :medium, :dimensions, :year])
    |> validate_required([:title, :file])
  end

end
