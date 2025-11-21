class PagesController < ApplicationController
  skip_before_action :authenticate_user!

  def home
  end

  def privacy
  end

  def toc
  end

  def about
  end
end
