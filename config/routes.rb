Rails.application.routes.draw do
  devise_for :users

  get "up" => "rails/health#show", as: :rails_health_check
  root to: "pages#home"

  get "privacy", to: "pages#privacy"
  get "toc", to: "pages#toc"
  get "about", to: "pages#about"

  authenticated :user do
    namespace :api, defaults: { format: :json } do
      get "me", to: "me#show"

      namespace :health do
        resources :body_measurements, only: [:index, :create, :update, :destroy, :show]
      end
    end

    get "app(/*path)", to: "dashboard#index", as: :react_app
  end

  unauthenticated do
    # When not authenticated, redirect any /app/* requests to sign in.
    get "app(/*path)", to: redirect("/users/sign_in")
  end
end
