Rails.application.routes.draw do
  devise_for :users

  get "up" => "rails/health#show", as: :rails_health_check

  authenticated :user do
    root to: "dashboard#index", as: :authenticated_root

    namespace :api, defaults: { format: :json } do
      namespace :health do
        resources :body_measurements, only: [:index, :create, :update, :destroy, :show]
      end
    end
  end

  root to: redirect("/users/sign_in")
end
