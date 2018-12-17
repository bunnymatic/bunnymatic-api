defmodule BunnymaticApi.Repo.Migrations.CreateImages do
  use Ecto.Migration

  def change do
    create table(:images) do
      add :name, :string
      add :description, :string
      add :file, :string
      add :medium, :string
      add :dimensions, :string
      add :year, :integer

      timestamps()
    end

  end
end
